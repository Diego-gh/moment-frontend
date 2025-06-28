import { useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { TextInput, PasswordInput, Button, Group } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { AtSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { loginUser } from '../../api/user';
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  loginUserSchema,
} from '../../validation/user';
import authStore from '../../stores/auth';

import css from './LoginPage.module.css';

const initialValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = authStore();

  const form = useForm({
    initialValues,
    mode: 'uncontrolled',
    validate: zodResolver(loginUserSchema),
    validateInputOnBlur: true,
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setCurrentUser(data);
      navigate('/');
    },
    onError: () => {
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

  const handleSubmit = (formData: typeof initialValues) => {
    mutation.mutate(formData);
    setLoading(true);
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
          <Button type='submit' loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default LoginPage;
