
class BaseConnector {
  getAllPersons(func) {};
  getPersons(func) {}
  getPersonsByUserId(userId, func) {};
  postPerson(person, funс) {};
  putPerson(person, func) {};
  deletePersonById(personId, func) {}
  getDeletedPersonsByUserId(userId, func) {};
  putPersonBack(personId,func) {}

}

export { BaseConnector } 