import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTopics } from '../redux/slices/topicsSlice';
import { addTopic } from '../services/topicService';

const AddTopicForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleAddTopic = async (e) => {
    e.preventDefault();
    const newTopic = await addTopic({ title, description });
    dispatch(setTopics((prevTopics) => [...prevTopics, newTopic]));
    setTitle('');
    setDescription('');
  };

  return (
    <div className="add-topic-form">
      <h3>Add New Topic</h3>
      <form onSubmit={handleAddTopic}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Topic</button>
      </form>
    </div>
  );
};

export default AddTopicForm;
