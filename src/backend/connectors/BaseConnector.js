
class BaseConnector {
  getAllPersons(func) {};
  getPersons(func) {}
  getAllPersonsByUserId(userId, func) {};
  postPerson(person, funс) {};
  putPerson(person, func) {};
  deletePersonById(personId, func) {}
}

export { BaseConnector } 