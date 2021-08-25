/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateShortLink } from '../../redux/linkReducer';
import { Loader } from '../../components';
import './CreatePage.css';

function CreatePage() {
  const history = useHistory();
  const [originalLink, setOriginalLink] = useState('');
  const isFetching = useSelector((state) => state.http.isFetching);
  const errorMessage = useSelector((state) => state.http.errorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Сократить ссылку';
  }, []);

  const createHandler = async (event) => {
    event.preventDefault();
    dispatch(generateShortLink(originalLink, history));
  };

  return (
    <>
      <div
        id="create"
        className={`container border ${isFetching ? 'isFetching' : ''}`}
      >
        <h1>Сократи ссылку ✂</h1>
        <form>
          <label htmlFor="originalLink">Ссылка:</label>
          <input
            name="originalLink"
            id="originalLink"
            className="border"
            value={originalLink}
            placeholder="Введите ссылку"
            onChange={(e) => setOriginalLink(e.target.value)}
          />
          <button type="submit" onClick={createHandler}>
            Сократить!
          </button>
        </form>
        {isFetching && <Loader />}
      </div>
      <div className={`error ${!errorMessage ? 'invisible' : ''}`}>
        {errorMessage || 'заглушка'}
      </div>
    </>
  );
}

export default CreatePage;
