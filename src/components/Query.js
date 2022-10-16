import TextField from '@mui/material/TextField';
import React, { useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]); 
  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get('/api/posts');
      setPosts(data.data.posts);
    }
    fetchData();
  }, []);
const finish = function Querying() {
  const [value, setValue] = useState("");
  const searchPost = async (e) => {
    const searchValue = e.target.value;
    const { data } = await http.get(`/api/posts?search=${searchValue}`); //Change this
    // The subset of posts is added to the state that will trigger a re-render of the UI
    setPosts(data.data.posts); 
  };
  return (

      <div>
        <TextField
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
  );
}
}
export default finish;
