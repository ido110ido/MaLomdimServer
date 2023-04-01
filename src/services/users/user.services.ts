import UsersModel from "../../model/users/users.model";

//get a main sub SubTopics list or all
export const getStudentEmailList = async (teacherId: string) => {
  try {
    const _teacher = await UsersModel.findById(teacherId);
    if (_teacher?.role === "teacher") {
      return _teacher.studentEmailList;
    }
    return [];
  } catch (error) {
    throw Error("Error while getting student List");
  }
};
// add a subTopic
export const addingStudentEmail = async (
  emails: string[],
  teacherId: string
) => {
  try {
    const _teacher = await UsersModel.findById(teacherId);
    if (!_teacher) {
      throw Error("teacher not found");
    }
    _teacher.studentEmailList.push(...emails);
    _teacher.save();
    return _teacher.studentEmailList;
  } catch (error: any) {
    throw Error("adding subTopics failed: " + error.message);
  }
};
//remove one sub sub topics, delete also related materials
export const removeStudentEmail = async (email: string, teacherId: string) => {
  try {
    const _teacher = await UsersModel.findById(teacherId);
    if (!_teacher) {
      throw Error("teacher not found");
    }
    const index = _teacher.studentEmailList.indexOf(email);
    if (index === -1) {
      throw Error("student email not found");
    }
    _teacher.studentEmailList.splice(index, 1);
    _teacher.save();
    return _teacher.studentEmailList;
  } catch (error: any) {
    throw Error("Error while removing student email:" + error.message);
  }
};
