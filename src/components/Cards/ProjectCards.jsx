import React from 'react'
import styled from 'styled-components'


const Button = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.8s ease-in-out;
`
const Card = styled.div`
    width: 330px;
    height: ${props => props.hasImage ? '500px' : '300px'};
    background-color: ${({ theme }) => `${theme.card}40`};
    cursor: pointer;
    border-radius: 16px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.1) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.3);
        &::before {
            opacity: 1;
        }
    }

    &:hover ${Button} {
        display: block;
    }
`

const Image = styled.img`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
`

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    margin-bottom: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`

/*const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`
const Avatar = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid ${({ theme }) => theme.card};
`*/

const ProjectCards = ({project,setOpenModal}) => {
    return (
        <Card hasImage={Boolean(project.image)} onClick={() => setOpenModal({state: true, project: project})}>
            {project.image && (
                <Image src={project.image}/>
            )}
            <Details>
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Description>{project.description}</Description>
                <Tags>
                    {project.tags?.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </Tags>
            </Details>
        </Card>
    )
}

export default ProjectCards