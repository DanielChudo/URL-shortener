import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader, LinkItem } from '../../components';
import { requestUserLinks, setLinks } from '../../redux/linkReducer';
import './LinksPage.css';

function LinksPage() {
  const links = useSelector((state) => state.link.links);
  const isFetching = useSelector((state) => state.http.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Все ссылки';
    dispatch(requestUserLinks());

    // чтобы не было мерцания интерфейса
    return () => {
      dispatch(setLinks(null));
    };
  }, [dispatch]);

  if (isFetching || !links) {
    return <Loader />;
  }

  if (!links.length) {
    return (
      <div id="links" className="container border">
        <h2>Вы пока не сократили ни одной ссылки :(</h2>
      </div>
    );
  }

  return (
    <div id="links" className="container border">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Оригинальная</th>
            <th>Сокращенная</th>
            <th>Детали</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <LinkItem key={link.code} link={link} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LinksPage;
