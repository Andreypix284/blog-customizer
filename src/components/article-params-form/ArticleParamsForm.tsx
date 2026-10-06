import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { useSidebarOutsideClick } from './useSidebarOutsideClick';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({
  onApply,
  onReset,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const [formKey, setFormKey] = useState(0);
  // RadioGroup из src/ui не управляет checked у <input> (uncontrolled),
  // поэтому после reset залипает последнее выбранное значение.
  // Перемонтируем через key, чтобы checked выставился по selected заново.

  const asideRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useSidebarOutsideClick({
    asideRef,
    arrowRef,
    isOpen: isSidebarOpen,
    onClose: () => setIsSidebarOpen(false),
  });

  const handleChange =
    (key: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((prev) => ({ ...prev, [key]: option }));
    };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onReset();
    setFormKey((k) => k + 1); // Принудительное перемонтирование RadioGroup, чтобы сбросить нативный checked
  };

  return (
    <>
      <div ref={arrowRef}>
        <ArrowButton
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen((v) => !v)}
        />
      </div>

      <aside
        ref={asideRef}
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />

          <RadioGroup
            key={formKey} // перемонтирование для сброса нативного checked
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleChange('fontSizeOption')}
          />

          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />

          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
