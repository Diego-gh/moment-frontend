import { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { TextInput, PasswordInput, Button, Group } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { AtSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { registerUser } from '../../api/user';
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
  registerUserSchema,
} from '../../validation/user';
import authStore from '../../stores/auth';

import css from './RegisterPage.module.css';

const initialValues = {
  displayName: '',
  username: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setCurrentUser } = authStore();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setCurrentUser(data);
      navigate('/');
    },
    onError: (error) => {
      let status = 0;
      if (axios.isAxiosError(error)) {
        status = error.response?.status ?? 0;
        console.error('Registration error:', status);
      }
      // TODO: Handle specific error statuses
      notifications.show({
        color: 'red',
        title: t('auth.notification.register.error.title'),
        message: t('auth.notification.register.error.message'),
        autoClose: 5000,
        position: 'top-center',
      });
      setLoading(false);
    },
  });

  const form = useForm({
    initialValues,
    mode: 'uncontrolled',
    validate: zodResolver(registerUserSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = (formData: typeof initialValues) => {
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
