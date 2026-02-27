import { useForm, type SubmitHandler } from 'react-hook-form';

import { saveContactMessage, type ContactMessagePayload } from '../../firebase/database-service';
import './ContactForm.css';

type ContactFormFields = ContactMessagePayload;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormFields>();

  const onSubmit: SubmitHandler<ContactFormFields> = async (data) => {
    await saveContactMessage(data);
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="contact-form__success" role="status">
        <span className="contact-form__success-icon" aria-hidden="true">✉︎</span>
        <h3 className="contact-form__success-title">Message sent!</h3>
        <p className="contact-form__success-text">
          Thank you for reaching out. We'll get back to you within 2 business days. ♡
        </p>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
    >
      {/* Name + Email row */}
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="contact-name" className="contact-form__label">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            className={`contact-form__input${errors.name ? ' contact-form__input--error' : ''}`}
            placeholder="Hello Kitty"
            autoComplete="name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          {errors.name && (
            <span className="contact-form__error" role="alert">{errors.name.message}</span>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-email" className="contact-form__label">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`}
            placeholder="hello@sanrio.com"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <span className="contact-form__error" role="alert">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="contact-form__field">
        <label htmlFor="contact-subject" className="contact-form__label">
          Subject <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          className={`contact-form__input${errors.subject ? ' contact-form__input--error' : ''}`}
          placeholder="What can we help you with?"
          {...register('subject', { required: 'Subject is required' })}
        />
        {errors.subject && (
          <span className="contact-form__error" role="alert">{errors.subject.message}</span>
        )}
      </div>

      {/* Message */}
      <div className="contact-form__field">
        <label htmlFor="contact-message" className="contact-form__label">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          className={`contact-form__textarea${errors.message ? ' contact-form__input--error' : ''}`}
          placeholder="Tell us everything…"
          rows={5}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
        />
        {errors.message && (
          <span className="contact-form__error" role="alert">{errors.message.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--lg contact-form__submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <><span className="contact-form__spinner" aria-hidden="true" /> Sending…</>
        ) : (
          'Send message ✦'
        )}
      </button>
    </form>
  );
};

export default ContactForm;
