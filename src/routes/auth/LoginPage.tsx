import { useForm, isEmail } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group } from '@mantine/core';
import { AtSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import css from './LoginPage.module.css';

import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './constants';

const LoginPage = () => {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail(t('auth.email.error')),
      password: (value) =>
        value.length < PASSWORD_MIN_LENGTH
          ? t('auth.password.error', { min: PASSWORD_MIN_LENGTH })
          : null,
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log('Form submitted:', values);
  };

  return (
    <div className={css.container}>
      <h1>{t('auth.headers.login')}</h1>
      <form className={css.form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('auth.email.label')}
          placeholder={t('auth.email.placeholder')}
          rightSectionPointerEvents='none'
          rightSection={<AtSign size={14} />}
          withAsterisk
          maxLength={EMAIL_MAX_LENGTH}
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label={t('auth.password.label')}
          placeholder={t('auth.password.placeholder')}
          withAsterisk
          maxLength={PASSWORD_MAX_LENGTH}
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Group justify='flex-end'>
          <Button type='submit'>Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default LoginPage;
