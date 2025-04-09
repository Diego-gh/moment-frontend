import { useForm, isEmail } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Group,
} from '@mantine/core';
import { AtSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import css from './RegisterPage.module.css';

import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  DISPLAY_NAME_MIN_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
} from './constants';

const RegisterPage = () => {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      displayName: '',
      username: '',
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      username: (value) =>
        value.length < USERNAME_MIN_LENGTH
          ? t('auth.name.error', { min: USERNAME_MIN_LENGTH })
          : null,
      displayName: (value) =>
        value.length < DISPLAY_NAME_MIN_LENGTH
          ? t('auth.displayName.error', { min: DISPLAY_NAME_MIN_LENGTH })
          : null,
      email: isEmail(t('auth.email.error')),
      password: (value) =>
        value.length < PASSWORD_MIN_LENGTH
          ? t('auth.password.error', { min: PASSWORD_MIN_LENGTH })
          : null,
      termsOfService: (value) =>
        value ? null : t('auth.termsOfService.error'),
    },
  });

  const handleSubmit = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.log('Form submitted:', values);
  };

  return (
    <div className={css.container}>
      <h1>Register</h1>
      <form className={css.form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('auth.username.label')}
          maxLength={USERNAME_MAX_LENGTH}
          placeholder={t('auth.username.placeholder')}
          withAsterisk
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <TextInput
          label={t('auth.displayName.label')}
          maxLength={DISPLAY_NAME_MAX_LENGTH}
          placeholder={t('auth.displayName.placeholder')}
          withAsterisk
          key={form.key('displayName')}
          {...form.getInputProps('displayName')}
        />
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
        <Checkbox
          mt='md'
          label='I agree to sell my privacy'
          key={form.key('termsOfService')}
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
        <Group justify='flex-end'>
          <Button type='submit'>Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default RegisterPage;
