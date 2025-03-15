import React, { useState } from "react";

import UserForm from "./components/UserForm";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="container">
      <h1 className="text-center">TestAPI CRUD Operations</h1>
      <UserForm selectedUser={selectedUser} onUserSaved={() => setSelectedUser(null)} />
      
    </div>
  );
}

export default App;
