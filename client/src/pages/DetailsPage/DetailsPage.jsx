import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../../components';
import { getLinkByCode, setLink } from '../../redux/linkReducer';
import './DetailsPage.css';

function DetailsPage() {
  const link = useSelector((state) => state.link.link);
  const isFetching = useSelector((state) => state.http.isFetching);
  const dispatch = useDispatch();

  const { code } = useParams();
  useEffect(() => {
    document.title = 'Детализация';
    dispatch(getLinkByCode(code));

    // чтобы не было мерцания интерфейса
    return () => {
      dispatch(setLink(null));
    };
  }, [dispatch]);

  if (isFetching || !link) {
    return <Loader />;
  }

  return (
    <div id="details" className="container border">
      <h2>Ссылка</h2>
      <p>
        Ваша сокращенная ссылка:
        <a href={link.shortLink} target="_blank" rel="noopener noreferrer">
          {link.shortLink}
        </a>
      </p>
      <p>
        Исходная ссылка:
        <a href={link.originalLink} target="_blank" rel="noopener noreferrer">
          {link.originalLink}
        </a>
      </p>
      <p>
        Количество переходов:
        <strong>{link.clicks}</strong>
      </p>
      <p>
        Дата создания:
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </div>
  );
}

export default DetailsPage;
