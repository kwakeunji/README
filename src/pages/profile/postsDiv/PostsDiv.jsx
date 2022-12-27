import React, { useEffect, useState } from 'react';
import loadPostsAPI from '../../../api/loadPostsAPI';
import Post from '../../../common/post/Post';
import * as S from './PostsDiv.Style';

/**
 * 필요한 것
 * isMine
 * isModalOpen
 * setIsModalOpen
 * setModalType
 * setModalData
 *
 */
const PostsDiv = ({
  accountName,
  isMine,
  isModalOpen,
  setIsModalOpen,
  setModalData,
  setModalType,
}) => {
  const [isList, setIsList] = useState(true);
  // 사용자 게시물 유무 확인 및 데이터
  const [isPostLoad, setIsPostLoad] = useState(null);

  const loadPost = async () => {
    await loadPostsAPI(accountName).then((data) => {
      setIsPostLoad(data.post);
    });
  };
  useEffect(() => {
    loadPost();
  }, []);
  return (
    <S.PostsDiv>
      <S.PostBtns>
        <S.ListBtn onClick={() => setIsList(true)} isList={isList} />
        <S.AlbumBtn onClick={() => setIsList(false)} isList={isList} />
      </S.PostBtns>
      {isList ? (
        <S.PostWrap>
          {isPostLoad &&
            isPostLoad.map((item) => (
              <Post
                key={item.id}
                data={item}
                isModalOpen={isModalOpen}
                isMine={isMine}
                setIsModalOpen={setIsModalOpen}
                setModalType={setModalType}
                setModalData={setModalData}
              />
            ))}
        </S.PostWrap>
      ) : (
        <S.ListWrap>
          {isPostLoad &&
            isPostLoad
              .filter((item) => item.image !== '')
              .map((item) => (
                <S.PostImg
                  key={item.id}
                  image={item.image.split(',')[0]}
                  multi={item.image.split(',').length > 1 && true}
                  onClick={() => {
                    console.log(item.image.split(',').length > 1 && true);
                    // navigate(`/post/${item.id}`)
                  }}
                />
              ))}
        </S.ListWrap>
      )}
    </S.PostsDiv>
  );
};

export default PostsDiv;
