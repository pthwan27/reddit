'use client';

import { useEffect, useRef, useState } from 'react';

import { useUploadImage } from '@/app/hooks/useUploadImage';

import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';
import SubBanner from '@/app/components/sub/detail/banner';
import SubInfos from '@/app/components/sub/detail/info';

import { Sub } from '@/app/types';

import RightSideBar from '../../../components/sub/rightSideBar';
import PostList from '../../post/list';

const SubDetail = ({ ...sub }: Sub) => {
  const { uploadIconImage, uploadBannerImage } = useUploadImage();
  const [iconImage, setIconImage] = useState<string>(sub.iconUrl);
  const [bannerImage, setBannerImage] = useState<string>(sub.bannerUrl);

  const { posts, loading, hasMore, fetchPosts, clearPosts } = usePostStore();

  const iconFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  const observerRef = useRef<HTMLDivElement>(null);

  const handleFileChange =
    (uploadType: 'icon' | 'banner') =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      try {
        const uploadFunctions = {
          icon: uploadIconImage,
          banner: uploadBannerImage,
        };

        const stateUpdater = {
          icon: setIconImage,
          banner: setBannerImage,
        };

        const newUrl = await uploadFunctions[uploadType]({
          slug: sub.slug,
          [uploadType]: file,
        });

        if (newUrl) {
          stateUpdater[uploadType](newUrl);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };

  const handleClick = (uploadType: 'icon' | 'banner') => {
    if (uploadType === 'icon') {
      iconFileInputRef.current?.click();
    } else {
      bannerFileInputRef.current?.click();
    }
  };

  useEffect(() => {
    setIconImage(sub.iconUrl);
  }, [sub.iconUrl]);

  useEffect(() => {
    setBannerImage(sub.bannerUrl);
  }, [sub.bannerUrl]);

  useEffect(() => {
    clearPosts();

    fetchPosts(sub.id);
  }, [sub.id, fetchPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !loading && hasMore) {
          fetchPosts(sub.id);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '100px',
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, sub.slug]);

  return (
    <SubDetailContainer>
      <Header>
        <SubBanner
          sub={sub}
          bannerImage={bannerImage}
          onEditClick={() => handleClick('banner')}
          isBanner={!!bannerImage}
        />

        <SubInfos
          sub={sub}
          iconImage={iconImage}
          onEditClick={() => handleClick('icon')}
          isIcon={!!iconImage}
        />
      </Header>
      <Main>
        <ObserverWrapper>
          <PostList posts={posts} />

          {loading && <LoadingSpinner />}

          {hasMore && !loading && (
            <div
              ref={observerRef}
              style={{ height: '20px', background: 'black' }}
            />
          )}
        </ObserverWrapper>
        <RightSideBar sub={sub} />
      </Main>

      <HiddenInput
        ref={bannerFileInputRef}
        type="file"
        onChange={handleFileChange('banner')}
      />
      <HiddenInput
        ref={iconFileInputRef}
        type="file"
        onChange={handleFileChange('icon')}
      />
    </SubDetailContainer>
  );
};

const SubDetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-sm);

  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  & > :nth-child(2) {
    display: none;
  }

  gap: var(--spacer-lg);

  @media (min-width: 960px) {
    & > :nth-child(1) {
      grid-template-columns: minmax(0, 756px) minmax(0, 316px);
    }
  }
`;

const ObserverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-sm);
`;

const HiddenInput = styled.input`
  display: none;
`;
export default SubDetail;
