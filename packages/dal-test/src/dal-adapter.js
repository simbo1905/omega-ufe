// This adapter helps load the ES module code in a CommonJS test environment
// Mock implementation of the DataAccessClient for testing
class DataAccessClient {
  async fetchUser(id) {
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'USER'
    };
  }

  async fetchAllUsers() {
    return [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'USER' },
      { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'ADMIN' },
      { id: '3', name: 'Bob Doe', email: 'bob.doe@example.com', role: 'GUEST' }
    ];
  }
}

// Export a mock of the same interface as the original dal package
module.exports = {
  DataAccessClient
};