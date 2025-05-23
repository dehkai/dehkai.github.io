import React from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle,SocialMediaIcons,SocialMediaIcon, ResumeButton } from './HeroStyle'
import HeroImg from '../../images/Hackathon.jpeg'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import BlurText from "../BlurText";
import SplitText from "../SplitText";

const HeroSection = () => {

    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        <BlurText
                            text={`Hi, I am`}
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="title-text"
                        />
                        <BlurText
                            text={`${Bio.name}`}
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="title-text"
                        />
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: Bio.roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>
                            <SplitText
                                text={Bio.description}
                                delay={30}
                                animationFrom={{ opacity: 0, transform: 'translate3d(0,20px,0)' }}
                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                easing="easeOutCubic"
                                threshold={0.2}
                                rootMargin="-20px"
                            />
                        </SubTitle>
                        <ResumeButton 
                            href={Bio.resume} 
                            target="_blank" 
                            rel="noopener noreferrer">
                            Check Resume
                        </ResumeButton>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <Img src={HeroImg} alt="hero-image" />
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>
        </div>
    )
}

export default HeroSection