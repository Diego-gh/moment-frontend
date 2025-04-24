import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { AtSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  loginUserSchema,
} from '../../validation/user';

import css from './LoginPage.module.css';

const initialValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { t } = useTranslation();

  const form = useForm({
    initialValues,
    validate: zodResolver(loginUserSchema),
  });

  const handleSubmit = (formData: typeof initialValues) => {
    console.log('Form submitted:', formData);
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
