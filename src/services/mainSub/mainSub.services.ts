import MainSubModel, { IMainSub } from "../../model/mainSub/mainSub.model";
import { IMaterials } from "../../model/materials/materials.model";
import { ISubTopics } from "../../model/subTopics/subTopics.model";
import {
  getSubTopicsMaterials,
  removeSubTopicMaterials,
} from "../materials/materials.services";
import {
  getMainSubSubTopic,
  removeMainSubTopics,
} from "../subTopics/subTopics.services";
import { Model, ObjectId } from "mongoose";
const dayNumVal: number = 86400000;
interface IMainSubDatesValue {
  id: string;
  beginsDay: number;
  endDate: number;
}

//getting data
//get all main subs - its working :)
export const getMainSubs = async () => {
  try {
    const _mainSubs = await MainSubModel.find();
    return _mainSubs;
  } catch (error) {
    throw Error("Error while getting main subjects data");
  }
};
//get all data of single main sub- its working :)
export const getSingleMainSubData = async (id: string) => {
  try {
    //get main sub
    const _mainSub = await MainSubModel.findById(id);
    if (!_mainSub) {
      throw new Error("Main subject not found.");
    }
    //get next main sub or null if last
    const _nextSub = await MainSubModel.findById(_mainSub?.nextMainSub);
    //get sub topic list
    const _subTopicList = await getMainSubSubTopic(id);
    //get material list
    const _materialsList = _subTopicList.map(async (subTopic) => {
      const listOfMaterials = await getSubTopicsMaterials(
        subTopic._id.toString()
      );
      return listOfMaterials || [];
    });
    return {
      mainSubData: _mainSub,
      nextSub: _nextSub,
      subTopicsList: _subTopicList,
      materialsList: _materialsList.flat(),
    };
  } catch (error: any) {
    throw new Error(
      "Error while getting single mainSubject data:" + error.message
    );
  }
};
//get today data of single main sub- its working :)
export const getTodayMainSubMaterials = async () => {
  try {
    // Get the current time in milliseconds
    const today = Date.now();
    // Find the first main subject in the database
    let indexMainSub = await MainSubModel.findOne({ head: true });
    if (!indexMainSub) {
      throw new Error("There are no main subjects in the course yet");
    }
    // Create an array of objects with the start and end dates of each main subject
    const listOfMainSubDatesValue = [
      {
        id: indexMainSub._id.toString(),
        beginsDay: indexMainSub.startDate,
        endDate: indexMainSub.startDate + indexMainSub.numOfDays * dayNumVal,
      },
    ];
    while (indexMainSub?.nextMainSub != null) {
      const prevuesSub = listOfMainSubDatesValue.at(-1);
      indexMainSub = await MainSubModel.findById(indexMainSub.nextMainSub);
      if (!indexMainSub || !prevuesSub) {
        throw new Error("Something went wrong");
      }
      listOfMainSubDatesValue.push({
        id: indexMainSub._id.toString(),
        beginsDay: prevuesSub.endDate + dayNumVal,
        endDate:
          prevuesSub.endDate + dayNumVal + indexMainSub.numOfDays * dayNumVal,
      });
    }
    // Find the main subject that is being learned today
    const todayMainSub =
      listOfMainSubDatesValue.find(
        (obj) => today >= obj.beginsDay && today <= obj.endDate
      ) || null;
    if (!todayMainSub) {
      throw new Error("There are no main subjects today");
    }
    // Get the data for the main subject being learned today
    return await getSingleMainSubData(todayMainSub.id);
  } catch (error) {
    throw Error("Error while getting today's main subject data");
  }
};

//add
//adding data-its working :)
export const addingMainSub = async (mainSub: IMainSub) => {
  try {
    const _newMainSub = await MainSubModel.create(mainSub);
    const count = await MainSubModel.countDocuments();
    if (count === 1) {
      _newMainSub.head = true;
      await _newMainSub.save();
      return await MainSubModel.find();
    }

    const lastMainSub = await MainSubModel.findOne({ nextMainSub: null });
    if (lastMainSub) {
      lastMainSub.nextMainSub = _newMainSub._id.toString();
      await lastMainSub.save();
    }

    _newMainSub.head = false;
    _newMainSub.nextMainSub = null;
    await _newMainSub.save();

    return await MainSubModel.find();
  } catch (error: any) {
    throw new Error("Failed to add main subject: " + error.message);
  }
};

//update order of main sub
export const updateMainSubOrder = async (
  mainSubId: string,
  newBeforeMainSubId: string | null
) => {
  try {
    if (mainSubId === newBeforeMainSubId) {
      return await MainSubModel.find();
    }
    //find the main sub to move
    const _mainSub = await MainSubModel.findById(mainSubId);
    if (!_mainSub) {
      throw new Error("Main subject not found.");
    }
    //if the main sub is the first subject
    if (_mainSub.head) {
      await MainSubModel.findByIdAndUpdate(_mainSub.nextMainSub, {
        head: true,
        startDate: _mainSub.startDate,
      });
      await MainSubModel.findByIdAndUpdate(mainSubId, {
        head: false,
        startDate: null,
      });
    } else {
      //connect the privies Main sub to the next main sub of the current Main
      await MainSubModel.findOneAndUpdate(
        { nextMainSub: mainSubId },
        { $set: { nextMainSub: _mainSub.nextMainSub } }
      );
    }
    //if no new prevues looker is provide that mean that it became the new head
    if (newBeforeMainSubId) {
      const _newBeforeMainSubId = await MainSubModel.findById(
        newBeforeMainSubId
      );
      //connect current main to the new privies Main sub next main sub
      await MainSubModel.findOneAndUpdate(
        { _id: mainSubId },
        { $set: { nextMainSub: _newBeforeMainSubId?.nextMainSub } }
      );
      //connect the new privies Main sub to the current main sub
      await MainSubModel.findOneAndUpdate(
        { _id: newBeforeMainSubId },
        { $set: { nextMainSub: mainSubId } }
      );
    } else {
      //what happened if main sub go to top of list
      //find head main sub and change it
      const _headMainSub = await MainSubModel.findOne({ head: true });
      await MainSubModel.findOneAndUpdate(
        { head: true },
        { $set: { head: false } }
      );
      //make Main sub to be the new head
      await MainSubModel.findOneAndUpdate(
        { _id: _mainSub._id },
        { $set: { nextMainSub: _headMainSub?._id.toString(), head: true } }
      );
    }
    return await MainSubModel.find();
  } catch (error) {
    throw Error("change main subject order failed");
  }
};
//update main sub
export const updateMainSub = async (id: string, mainSub: IMainSub) => {
  try {
    await MainSubModel.findByIdAndUpdate(id, mainSub);
    return await MainSubModel.find();
  } catch (error) {
    throw Error("update main subject failed");
  }
};

//remove main sub, delete also related sub topics ------- not done
export const removeMainSub = async (id: string) => {
  try {
    const deleteMainSub = await MainSubModel.findById(id);
    if (!deleteMainSub) {
      throw new Error("Main subject not found.");
    }
    //remove all subTopics of main sub
    await removeMainSubTopics(id);
    await MainSubModel.findOneAndUpdate(
      { nextMainSub: id },
      { $set: { nextMainSub: deleteMainSub.nextMainSub } },
      (err: any) => {
        if (err) {
        }
      }
    );

    //remove main sub
    await MainSubModel.findByIdAndDelete(id);
  } catch (error) {
    throw Error("Error while removing main subject data");
  }
};
