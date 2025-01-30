import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../api/redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { fetchTopics, likeTopic, dislikeTopic } from "../api/redux/reducers/topic";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { topics, status, error } = useSelector((state) => state.topics);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTopics());
        }
    }, [dispatch, status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <h2>List of topics</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success">+ Add new</button>
                <button className="btn btn-danger" onClick={handleLogout}>🚪 Logout</button>
            </div>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.topicId}>
                        <h3>{topic.title}</h3>
                        <p>{topic.description}</p>
                        <p>Author: {topic.author}</p>
                        <p>Total Votes: {topic.totalVote}</p>
                        <p>Like Percentage: {topic.likePercentage}%</p>
                        <p>Dislike Percentage: {topic.dislikePercentage}%</p>
                        <button className="btn btn-danger me-2" onClick={() => dispatch(likeTopic(topic.topicId))}>❤️ Like</button>
                        <button className="btn btn-primary" onClick={() => dispatch(dislikeTopic(topic.topicId))}>👎 Dislike</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;