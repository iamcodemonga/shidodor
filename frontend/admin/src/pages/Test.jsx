import React, { useState } from 'react';
import axios from 'axios';
// import { useForm } from '../hooks/useForm';

export default function Test() {

  const [ file, setFile ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ title, setTitle ] = useState("");
  const [ desc, setDesc ] = useState("");
  // let { response, postData } = useForm('http://localhost:5000/upload/test', 'post');
  

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ response, setResponse ] = useState('');
  // console.log('file:' + file.name);
  // console.log('image:' + image.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file && image) {

      const formData = new FormData();
      const imagename = `${Date.now()+image.name}`;
      const filename = `${Date.now()+file.name}`;

      //files here
      formData.append('file', file);
      formData.append('image', image);

      //body here
      formData.append('filename', filename);
      formData.append('imagename', imagename);
      formData.append('title', title);
      formData.append('description', desc);

      setLoading(true);

      axios.post('http://localhost:5000/upload/test', formData)
        .then(response => {
          console.log(response.data[0].message);
          setLoading(false);
          setResponse(response.data[0].message);
        })
        .catch(err => {
          console.log(err);
          setError(err.message);
          setLoading(false);
        });

    } else {
      console.log('please choose files')
    }
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="file" name='file' className='myFile form-control mb-3' id='file' placeholder="Add file" onChange={(e)=>{setFile(e.target.files[0])}} />
            <input type="file" name='image' className='myFile form-control mb-3' id='image' placeholder="Add file 2" onChange={(e)=>{setImage(e.target.files[0])}} />
            <input type="text" name='title' className='title form-control mb-3' id='title'  placeholder="Add title" onChange={(e) => {setTitle(e.target.value)}} value={title} />
            <input type="text" name='desc' className='desc form-control mb-3' id='desc'  placeholder="Add description" onChange={(e) => {setDesc(e.target.value)}} value={desc} />
            <button type="submit">Submit</button>
            {loading && <p>loading now...</p>}
            {error && <p>error</p>}
            {response && <p>{response}</p>}
        </form>
    </>
  )
}

