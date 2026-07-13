import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import styles from './AskSparkySheet.module.css';
import { IconButton } from '@/components/ui/IconButton';
import { X } from '@/components/icons/X';
import { ChevronUp } from '@/components/icons/ChevronUp';
import { ThumbUp } from '@/components/icons/ThumbUp';
import { ThumbDown } from '@/components/icons/ThumbDown';
import { ArrowRight } from '@/components/icons/ArrowRight';

export interface AskSparkySheetProps {
  isOpen: boolean;
  onClose: () => void;
  /** Display name used in the greeting message. */
  userName?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp?: string;
  showFeedback?: boolean;
  feedback?: 'up' | 'down' | null;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function initialMessages(userName: string): ChatMessage[] {
  return [
    { id: 'm1', role: 'assistant', text: `Hey ${userName}, how can I help?` },
    {
      id: 'm2',
      role: 'user',
      text: "What's the difference between OLED and QLED?",
      timestamp: formatTime(new Date()),
    },
    {
      id: 'm3',
      role: 'assistant',
      text: 'QLED and OLED refer to two different types of TV panel technologies for color and light.',
      showFeedback: true,
      feedback: null,
    },
    { id: 'm4', role: 'assistant', text: 'Let me know if that helps!' },
  ];
}

/**
 * "Ask Sparky" chat bottom sheet — Walmart's AI assistant surface.
 * Slides up from the bottom (desktop: anchored bottom-right panel).
 */
export function AskSparkySheet({ isOpen, onClose, userName = 'Emilia' }: AskSparkySheetProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(() => initialMessages(userName));
  const [draft, setDraft] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const messagesScrollRef = React.useRef<HTMLDivElement>(null);
  const timersRef = React.useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const safeTimeout = React.useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, delay);
    timersRef.current.add(id);
    return id;
  }, []);

  React.useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current.clear();
    };
  }, []);

  React.useEffect(() => {
    const end = messagesEndRef.current;
    const scroller = messagesScrollRef.current;
    if (!end || !scroller) return;
    // Scroll only inside the messages pane — never shift the sheet/footer.
    scroller.scrollTop = scroller.scrollHeight;
  }, [messages, isTyping]);

  const handleFeedback = (id: string, feedback: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, feedback: m.feedback === feedback ? null : feedback } : m))
    );
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: formatTime(new Date()),
    };
    setMessages((prev) => [...prev, userMsg]);
    setDraft('');
    setIsTyping(true);

    safeTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: "Great question! I'm still learning, but here's my best answer — let me know if you'd like more detail.",
        },
      ]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DrawerPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      modal={false}
      repositionInputs={false}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Content className={styles.content}>
          <div className={styles.handle}>
            <div className={styles.handleBar} />
          </div>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.avatar} aria-hidden="true">
              <img src="/assets/sparky-listening.svg" alt="" className={styles.avatarFace} />
            </div>
            <DrawerPrimitive.Title className={styles.title}>Ask Sparky</DrawerPrimitive.Title>
            <div className={styles.headerActions}>
              <IconButton variant="white" size="small" aria-label="Minimize" UNSAFE_className={styles.headerIconBtn}>
                <ChevronUp />
              </IconButton>
              <DrawerPrimitive.Close asChild>
                <IconButton variant="white" size="small" aria-label="Close" UNSAFE_className={styles.headerIconBtn}>
                  <X />
                </IconButton>
              </DrawerPrimitive.Close>
            </div>
          </div>

          {/* Disclaimer */}
          <p className={styles.disclaimer}>
            Sparky is powered by AI. It may make mistakes or use data from outside Walmart. Never share personally
            sensitive info.
          </p>

          {/* Messages */}
          <div ref={messagesScrollRef} className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageRow} ${
                  message.role === 'user' ? styles['messageRow--user'] : styles['messageRow--assistant']
                }`}
              >
                <div
                  className={`${styles.bubble} ${
                    message.role === 'user' ? styles['bubble--user'] : styles['bubble--assistant']
                  }`}
                >
                  {message.text}
                </div>
                {message.timestamp && <div className={styles.timestamp}>{message.timestamp}</div>}
                {message.showFeedback && (
                  <div className={styles.feedbackRow}>
                    <span>Was that helpful?</span>
                    <div className={styles.feedbackButtons}>
                      <button
                        type="button"
                        className={`${styles.feedbackBtn} ${
                          message.feedback === 'up' ? styles['feedbackBtn--active'] : ''
                        }`}
                        aria-label="Helpful"
                        aria-pressed={message.feedback === 'up'}
                        onClick={() => handleFeedback(message.id, 'up')}
                      >
                        <ThumbUp />
                      </button>
                      <button
                        type="button"
                        className={`${styles.feedbackBtn} ${
                          message.feedback === 'down' ? styles['feedbackBtn--active'] : ''
                        }`}
                        aria-label="Not helpful"
                        aria-pressed={message.feedback === 'down'}
                        onClick={() => handleFeedback(message.id, 'down')}
                      >
                        <ThumbDown />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className={styles.typingRow}>
                <span>Sparky is thinking</span>
                <span className={styles.typingDot} style={{ animationDelay: '0ms' }}>.</span>
                <span className={styles.typingDot} style={{ animationDelay: '200ms' }}>.</span>
                <span className={styles.typingDot} style={{ animationDelay: '400ms' }}>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer input */}
          <div className={styles.footer}>
            <div className={styles.inputWrap}>
              <input
                type="text"
                className={styles.input}
                placeholder="Curious about something? Ask me!"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Ask Sparky a question"
              />
              <IconButton
                variant="primary"
                size="small"
                shape="rounded"
                UNSAFE_className={styles.sendBtn}
                onClick={handleSend}
                disabled={!draft.trim()}
                aria-label="Send message"
              >
                <ArrowRight />
              </IconButton>
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}

export default AskSparkySheet;
