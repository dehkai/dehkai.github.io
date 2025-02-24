import { useRef, useEffect, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import styled from 'styled-components';

const StyledText = styled.p`
  font-weight: ${({ fontWeight }) => fontWeight || '700'};
  font-size: ${({ fontSize }) => fontSize || '50px'};
  color: ${({ theme, color }) => color || theme.text_primary};
  line-height: ${({ lineHeight }) => lineHeight || '68px'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  
  @media (max-width: 960px) {
    text-align: ${({ mobileTextAlign }) => mobileTextAlign || 'center'};
  }
  
  @media (max-width: 640px) {
    font-size: ${({ mobileFontSize }) => mobileFontSize || '40px'};
    line-height: ${({ mobileLineHeight }) => mobileLineHeight || '48px'};
    margin-bottom: ${({ mobileMarginBottom }) => mobileMarginBottom || '8px'};
  }
`;

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOutCubic',
  onAnimationComplete,
  // Style props
  fontWeight,
  fontSize,
  color,
  lineHeight,
  margin,
  padding,
  textAlign,
  mobileTextAlign,
  mobileFontSize,
  mobileLineHeight,
  mobileMarginBottom,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
          for (const step of (animationTo || defaultTo)) {
            await next(step);
          }
          animatedCount.current += 1;
          if (animatedCount.current === elements.length && onAnimationComplete) {
            onAnimationComplete();
          }
        }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <StyledText
      ref={ref}
      className={`blur-text ${className}`}
      fontWeight={fontWeight}
      fontSize={fontSize}
      color={color}
      lineHeight={lineHeight}
      margin={margin}
      padding={padding}
      textAlign={textAlign}
      mobileTextAlign={mobileTextAlign}
      mobileFontSize={mobileFontSize}
      mobileLineHeight={mobileLineHeight}
      mobileMarginBottom={mobileMarginBottom}
    >
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={{
            ...props,
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
          }}
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </StyledText>
  );
};

export default BlurText;
