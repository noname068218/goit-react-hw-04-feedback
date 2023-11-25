import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FeedbackWraper, BtnWraper } from './Feedback.style';
import { Section } from './Title';
import { FeedbackOptions } from './Button';
import { Statistics } from './Statistic';

const Notification = ({ message }) => <p>{message}</p>;

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const props = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -100 },
  });

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  const onLeaveFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        break;
    }
  };

  return (
    <animated.div
      style={{
        opacity: props.opacity,
        transform: props.y.interpolate(y => `translateY(${y}px)`),
      }}
    >
      <FeedbackWraper>
        <Section title="Please leave feedback">
          <BtnWraper>
            <FeedbackOptions
              options={{ good: 'Good', neutral: 'Neutral', bad: 'Bad' }}
              onLeaveFeedback={onLeaveFeedback}
            />
          </BtnWraper>
        </Section>
        {countTotalFeedback() > 0 ? (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positive={countPositiveFeedbackPercentage()}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </FeedbackWraper>
    </animated.div>
  );
};
