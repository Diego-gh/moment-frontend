import { useState } from 'react';
import { useForm, isEmail } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Group,
} from '@mantine/core';
import { AtSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { RegisterFormType } from './types';
import { registerUser } from '../../api/auth';

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

  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      setLoading(false);
    },
    onError: () => {
      notifications.show({
        color: 'red',
        title: t('auth.notication.register.error.title'),
        message: t('auth.notication.register.error.message'),
        autoClose: 5000,
        position: 'top-center',
      });
      setLoading(false);
    },
  });

  const form = useForm({
    initialValues: {
      displayName: '',
      username: '',
      email: '',
      password: '',
      termsOfServiceAgreed: false,
    },

    validate: {
      username: (value) =>
        value.length < USERNAME_MIN_LENGTH
          ? t('auth.username.error', { min: USERNAME_MIN_LENGTH })
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
      termsOfServiceAgreed: (value) =>
        value ? null : t('auth.termsOfService.error'),
    },
  });

  const handleSubmit = (formData: RegisterFormType) => {
    console.log('Form submitted:', formData);
    mutation.mutate(formData);
    setLoading(true);
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
          label={t('auth.termsOfService.label')}
          key={form.key('termsOfServiceAgreed')}
          {...form.getInputProps('termsOfServiceAgreed', {
            type: 'checkbox',
          })}
        />
        <Group justify='flex-end'>
          <Button type='submit' loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default RegisterPage;
