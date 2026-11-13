import React, { useRef, useState } from 'react';
import { Loader2, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import BookButton from './BookButton';
import { COMMUNITY_WHATSAPP_URL } from '@/config/book';
import { communitySchema } from '@/lib/communityValidation.js';

type Field = 'name' | 'email' | 'phone' | 'consent' | 'honeypot';
type Errors = Partial<Record<Field, string>>;
const inputClass = 'min-h-11 rounded-none border-lapis/40 bg-background text-lapis placeholder:text-lapis/50 focus-visible:ring-carnelian';

const CommunitySection = () => {
  const [values, setValues] = useState({ name: '', email: '', phone: '', consent: false, honeypot: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<'joined' | 'exists' | null>(null);
  const [failure, setFailure] = useState('');
  const busy = useRef(false);

  const validate = (field?: Field) => {
    const result = communitySchema.safeParse(values);
    const next: Errors = {};
    if (!result.success) {
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as Field;
        next[key] ??= issue.message;
      });
    }
    setErrors(previous => field ? { ...previous, [field]: next[field] } : next);
    return result;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy.current) return;
    setFailure('');
    const result = validate();
    if (!result.success) return;
    busy.current = true;
    setPending(true);
    try {
      const response = await fetch('/api/community', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result.data),
      });
      const data = await response.json();
      if (!response.ok || (data.status !== 'joined' && data.status !== 'exists')) {
        setFailure('We couldn’t save your signup. Please try again, or chat with the author below.');
        return;
      }
      setStatus(data.status);
      setValues({ name: '', email: '', phone: '', consent: false, honeypot: '' });
    } catch {
      setFailure('We couldn’t save your signup. Please try again, or chat with the author below.');
    } finally {
      busy.current = false;
      setPending(false);
    }
  };

  return (
    <section id="community" aria-labelledby="community-heading" className="scroll-mt-20 bg-background text-lapis band-section">
      <div className="site-container">
        <h2 id="community-heading" className="page-heading">Join the Raghav Kartikeya Community</h2>
        <p className="text-lg max-w-2xl mb-8">Join fellow readers for Book 2 news, giveaways and chats with the author. There’s a place for you here.</p>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="min-w-0 border-t-4 border-lapis pt-6">
            {status ? (
              <div role="status" className="space-y-3">
                <h3 className="font-serif text-2xl">{status === 'exists' ? 'You’re already part of the community!' : "You're in! Welcome to the community."}</h3>
                <p>{status === 'exists' ? 'This email is already registered. It’s lovely to have you here.' : 'Thank you for joining Raghav’s journey. We’re glad you’re here.'}</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5" aria-busy={pending}>
                {([
                  { key: 'name', label: 'Name', type: 'text', autoComplete: 'name', maxLength: 100 },
                  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 254 },
                  { key: 'phone', label: 'WhatsApp number', type: 'tel', autoComplete: 'tel', maxLength: 40 },
                ] as const).map(field => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={`community-${field.key}`}>{field.label}</Label>
                    <Input id={`community-${field.key}`} name={field.key} type={field.type} inputMode={field.key === 'phone' ? 'tel' : field.key === 'email' ? 'email' : 'text'} autoComplete={field.autoComplete} maxLength={field.maxLength} required disabled={pending} value={values[field.key]} onChange={event => setValues(previous => ({ ...previous, [field.key]: event.target.value }))} onBlur={() => validate(field.key)} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `community-${field.key}-error` : undefined} className={inputClass} />
                    {errors[field.key] && <p id={`community-${field.key}-error`} className="text-carnelian text-sm" role="alert">{errors[field.key]}</p>}
                  </div>
                ))}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="community-website">Website</label>
                  <input id="community-website" name="honeypot" tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={event => setValues(previous => ({ ...previous, honeypot: event.target.value }))} />
                </div>
                <div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="community-consent" name="consent" required disabled={pending} checked={values.consent} onCheckedChange={checked => { setValues(previous => ({ ...previous, consent: checked === true })); setErrors(previous => ({ ...previous, consent: undefined })); }} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'community-consent-error' : undefined} className="min-h-11 min-w-11 rounded-none border-lapis data-[state=checked]:bg-background data-[state=checked]:text-stonepage focus-visible:ring-carnelian" />
                    <Label htmlFor="community-consent" className="min-h-11 cursor-pointer leading-relaxed">I agree to receive updates from the author on email and WhatsApp. I can opt out any time.</Label>
                  </div>
                  {errors.consent && <p id="community-consent-error" className="text-carnelian text-sm mt-2" role="alert">{errors.consent}</p>}
                </div>
                {failure && <p role="alert" className="text-carnelian">{failure}</p>}
                <BookButton type="submit" disabled={pending} className="min-h-11 w-full sm:w-auto gap-2">{pending && <Loader2 aria-hidden="true" size={18} className="animate-spin motion-reduce:animate-none" />}{pending ? 'Joining…' : 'Join the community'}</BookButton>
              </form>
            )}
            <p className="text-sm text-lapis/75 mt-5">Your details are used only to keep you updated about the books and are never shared.</p>
          </div>
          <div className="min-w-0 border-t-4 border-lapis pt-6 space-y-5">
            <h3 className="font-serif text-2xl">A conversation with Rituraj</h3>
            <BookButton href={COMMUNITY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="outline" className="min-h-11 w-full sm:w-auto gap-2">
              <MessageCircle aria-hidden="true" className="shrink-0" size={20} />
              <span>Chat with the author on WhatsApp<span className="sr-only"> (opens in a new tab)</span></span>
            </BookButton>
            <p className="font-semibold">93248 93014</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;