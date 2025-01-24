import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTopics } from '../redux/slices/topicsSlice';
import { fetchTopics } from '../services/topicService';
import TopicCard from './TopicCard';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../redux/slices/authSlice';

const Home = () => {
  const topics = useSelector((state) => state.topics.topics);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopics = async () => {
      const data = await fetchTopics();
      dispatch(setTopics(data));
    };
    loadTopics();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };

  return (
    <div className="home-container">
      <button onClick={handleLogout}>Logout</button>
      <h2>Topics</h2>
      <div className="topics-list">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Home;