import { BaseConnector } from '../../connectors/BaseConnector.js'

const testBaseConnector = new BaseConnector;

describe('testBaseConnector', function(){
  it('should be defined', function(){
    expect(  testBaseConnector.getAllPersons
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.getAllPersons).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.getPersons
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.getPersons).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.getPersonsByUserId
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.getPersonsByUserId).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.postPerson
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.postPerson).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.putPerson
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.putPerson).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.deletePersonById
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.deletePersonById).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.getDeletedPersonsByUserId
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.getDeletedPersonsByUserId).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.putPersonBack
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.putPersonBack).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.deletePersonsByUserId
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.deletePersonsByUserId).toBe('function');
  })
  it('should be defined', function(){
    expect(  testBaseConnector.putPersonsBackByUserId
      ).toBeDefined();
  })
  it('should be function', function(){
    expect(typeof testBaseConnector.putPersonsBackByUserId).toBe('function');
  })
})