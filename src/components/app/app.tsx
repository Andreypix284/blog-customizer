import { clsx } from 'clsx';
import { useState } from 'react';
import { defaultArticleState, type ArticleStateType } from 'src/constants/articleProps';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [appliedState, setAppliedState] =
    useState<ArticleStateType>(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedState.fontFamilyOption.value,
          '--font-size': appliedState.fontSizeOption.value,
          '--font-color': appliedState.fontColor.value,
          '--container-width': appliedState.contentWidth.value,
          '--bg-color': appliedState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        onApply={setAppliedState}
        onReset={() => setAppliedState(defaultArticleState)}
      />
      <Article />
    </main>
  );
};
