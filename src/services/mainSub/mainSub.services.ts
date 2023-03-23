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
import { ObjectId } from "mongoose";
const materialsServices = require("../../services/materials/materials.services");
const subTopicServices = require("../../services/materials/subTopics.services");

//remove main sub, delete also related sub topics
export const removeMainSub = async (id: string) => {
  try {
    //remove all subTopics of main sub
    await removeMainSubTopics(id);
    //remove main sub
    await MainSubModel.findByIdAndDelete(id);
  } catch (error) {
    throw Error("Error while removing main subject data");
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

//getting data
//get all main subs
export const getMainSubs = async () => {
  try {
    const _mainSubs = await MainSubModel.find();
    return _mainSubs;
  } catch (error) {
    throw Error("Error while getting main subjects data");
  }
};
//get all data of single main sub
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
  } catch (error) {
    throw new Error("Error while getting single mainSubject data");
  }
};
//get today data of single main sub
export const getTodayMainSubMaterials = async () => {
  try {
    const today: number = Date.now();
    //find main sub that learned today
    const _currentSubjectDate = await MainSubModel.findOne(
      { startDate: { $gte: today }, endDate: { $gte: today } },
      { _id: true }
    );
    if (_currentSubjectDate) {
      return await getSingleMainSubData(_currentSubjectDate._id.toString());
    }
  } catch (error) {
    throw new Error("Error while getting today mainSubject data");
  }
};

//add
//adding data
export const addingMainSub = async (mainSub: IMainSub) => {
  try {
    //create new main sub
    const _newMainSub = await MainSubModel.create(mainSub);
    //if its the first object
    if ((await MainSubModel.find()).length === 0) {
      _newMainSub.head = true;
      await _newMainSub.save();
      return await MainSubModel.find();
    }
    //find last date
    const result = await MainSubModel.aggregate([
      {
        $group: {
          _id: null,
          maxEndDate: { $max: "$endDate" },
        },
      },
    ]);
    const lastDate: number = result[0].maxEndDate;
    if (_newMainSub.startDate != lastDate) {
      _newMainSub.startDate = lastDate;
    }
    await _newMainSub.save();
    // await MainSubModel.findOneAndUpdate(
    //   { nextMainSub: null },
    //   { $set: { nextMainSub: _newMainSub._id.toString() } }
    // );
    return await MainSubModel.find();
  } catch (error) {
    throw Error("adding main subject failed");
  }
};
//update order of main sub
export const updateMainSubOrder = async (
  mainSubId: string,
  newBeforeMainSubId?: string | null
) => {
  try {
    if (!newBeforeMainSubId) {
      newBeforeMainSubId = null;
    }
    const _mainSub = await MainSubModel.findById(mainSubId);
    const _newBeforeMainSubId = await MainSubModel.findById(newBeforeMainSubId);
    if (!_mainSub) {
      throw new Error("Main subject not found.");
    }
    //connect the privies Main sub to the next main sub of the current Main
    await MainSubModel.findOneAndUpdate(
      { nextMainSub: mainSubId },
      { $set: { nextMainSub: _mainSub.nextMainSub } }
    );
    //connect current main to the new privies Main sub next main sub
    await MainSubModel.findOneAndUpdate(
      { _id: mainSubId },
      { $set: { nextMainSub: _newBeforeMainSubId.nextMainSub } }
    );
    //connect the new privies Main sub to the current main sub
    await MainSubModel.findOneAndUpdate(
      { _id: _newBeforeMainSubId._id },
      { $set: { nextMainSub: _mainSub._id.toString() } }
    );
    return await MainSubModel.find();
  } catch (error) {
    throw Error("change main subject order failed");
  }
};
