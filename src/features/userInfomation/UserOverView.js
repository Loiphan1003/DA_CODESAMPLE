import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTrophy } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/UserOverView.module.scss';
import taiKhoanAPI from '../../apis/taiKhoanAPI';



function UserOverView(props) {

    const progressRef = useRef(),
        progressEasyRef = useRef(),
        progressNormalRef = useRef(),
        progressHardRef = useRef();

    const uId = localStorage.getItem('uId');
    const image = window.atob(JSON.parse(localStorage.getItem('linkAvatar')))

    const [valueProgressBar, setValueProgressBar] = useState(0);
    const [easyValue, setEasyValue] = useState(50);
    const [normalValue, setNormalValue] = useState(20);
    const [hardValue, setHardValue] = useState(4);
    const [tabType, setTabStyle] = useState('questions');


    const tabs = [
        {
            name: 'questions',
            content: 'Câu hỏi',
            icon: faList
        },
        {
            name: 'tournaments',
            content: 'Giải đấu',
            icon: faTrophy
        }
    ]

    const questions = [
        {
            name: 'cộng hai số',
            time: '1 tháng trước',
        },
        {
            name: 'trừ hai số',
            time: '1 tháng trước',
        },
        {
            name: 'trừ hai số',
            time: '1 tháng trước',
        },
        {
            name: 'trừ hai số',
            time: '1 tháng trước',
        },
        {
            name: 'trừ hai số',
            time: '1 tháng trước',
        },
        {
            name: 'trừ hai số',
            time: '1 tháng trước',
        },
        {
            name: 'trừ hai số',
            time: '1 tháng trước',
        },
        {
            name: 'trừ hai số',
            time: '1 tháng trước',
        }
    ]

    const tournaments = [
        {
            name: 'Lập trình 1',
            time: '1 tháng trước',
        },
        {
            name: 'Lập trình 2',
            time: '1 tháng trước',
        },
    ]

    useEffect(() => {
        // let progressbar = document.querySelector(progressRef);

        //     let easyProgress = document.querySelector(".easy-progress");
        //     let normalProgress = document.querySelector(".normal-progress");
        //     let hardProgress = document.querySelector(".hard-progress");

        let progressStartValue = 0;
        let progressEndValue = 10;
        let speed = 10;



        const progress = setInterval(() => {
            progressStartValue++;

            setValueProgressBar(progressStartValue);
            progressEasyRef.current.style.width = '50%';
            progressNormalRef.current.style.width = '20%';
            progressHardRef.current.style.width = '4%';

            progressRef.current.style.background = `conic-gradient(orange ${progressStartValue * 3.6}deg, white 0deg)`;
            if (progressStartValue === progressEndValue) {
                // easyProgress.style.width = `${easyValue}%`;
                // normalProgress.style.width = `${normalValue}%`;
                // hardProgress.style.width = `${hardValue}%`;
                return clearInterval(progress);
            }
        }, speed);

        const getAvatar = async () => {
            const response = await taiKhoanAPI.getOne(uId);
            const image = atob(localStorage.getItem('linkAvatar'));
            console.log(typeof iamge);
            return image;
        }

    }, [])



    return (
        <div>
            <div className={styles.container}
            // 'sm:flex-col sm:gap-2 tablet:gap-4 tablet:flex-col w-full flex laptop:flex-row'
            >
                <div className={styles.left_col}>

                    <div className={styles.user_info}>
                        <div>
                            <img src={image}
                                // 'https://assets.leetcode.com/users/user8961DO/avatar_1625471241.png'
                                alt='avatar' />
                            <div>
                                <div>user8961DO</div>
                                <div>Rank 1,383,686</div>
                            </div>
                        </div>

                        <a href='/infomation'>
                            <span>Chỉnh sửa thông tin</span>
                        </a>
                    </div>

                    <div className={styles.line}></div>

                    <div className={styles.programming} >
                        <p>Ngôn ngữ</p>

                        <div >
                            <div>
                                <div className={styles.name_programming} >
                                    <span>Java</span>
                                </div>

                                <div>
                                    <span>11</span> Câu hỏi
                                </div>
                            </div>

                            <div>
                                <div className={styles.name_programming} >
                                    <span>Javascript</span>
                                </div>

                                <div>
                                    <span>11</span> Câu hỏi
                                </div>
                            </div>

                            <div>
                                <div className={styles.name_programming} >
                                    <span>C#</span>
                                </div>

                                <div>
                                    <span>1</span> Câu hỏi
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.right_col}
                // 'flex sm:gap-4 tablet:gap-4 flex-col w-full' 
                >

                    <div className={styles.right_col_head}
                    // 'sm:flex-col sm:gap-3 sm:h-fit sm:ml-0 tablet:ml-0 tablet:h-fit  w-auto h-[300px] ml-4 flex flex-row gap-1' 
                    >

                        <div className={styles.statistics}>
                            <h3>Câu hỏi</h3>

                            <div >

                                <div ref={progressRef} className={styles.progress}>
                                    <span className='value-progress relative text-[20px] text-black' >
                                        {valueProgressBar}%
                                    </span>
                                </div>

                                <div className={styles.level_questions}
                                // 'sm:gap-5 w-[250px] flex flex-col gap-3' 
                                >

                                    <div
                                    // className='w-auto h-fit'
                                    >
                                        <div className={styles.title_level}>
                                            <p>Dễ</p>
                                            <p>15/579</p>
                                            <p>{easyValue}%</p>
                                        </div>
                                        <div className={styles.progress_easy}>
                                            <span ref={progressEasyRef} ></span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className={styles.title_level}
                                        // 'flex flex-row justify-between' 
                                        >
                                            <p>Trung bình</p>
                                            <p>11/579</p>
                                            <p>{normalValue}%</p>
                                        </div>
                                        <div className={styles.progress_normal}
                                        // 'w-auto h-2 bg-yellow-200 rounded-sm relative scale-x-0 origin-left animate-animate'
                                        >
                                            <span ref={progressNormalRef} ></span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className={styles.title_level}
                                        // 'flex flex-row justify-between' 
                                        >
                                            <p>Khó</p>
                                            <p>11/579</p>
                                            <p>{hardValue}%</p>
                                        </div>
                                        <div className={styles.progress_hard}
                                        // 'w-auto h-2 bg-red-200 rounded-sm relative scale-x-0 origin-left animate-animate'
                                        >
                                            <span ref={progressHardRef} ></span>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                        <div className={styles.tournaments}>
                            <h3>Giải đấu</h3>
                            <div>
                                <div>
                                    <span>10</span>
                                </div>
                                {/* <img src={TrophyImage} alt="giải đấu" /> */}
                            </div>
                        </div>
                    </div>

                    <div className={styles.right_content}
                    // 'sm:ml-0 tablet:ml-0 h-full w-auto bg-white ml-4 rounded-lg shadow-inner p-5' 
                    >

                        <div className={styles.content_tab}
                        // 'flex flex-row gap-2' 
                        >

                            {tabs.map((tab) => (
                                <div key={tab.name}
                                    onClick={() => setTabStyle(tab.name)}
                                    className={tabType === tab.name ? styles.tab_active
                                        // 'flex items-center gap-2 p-3 bg-slate-200 hover:cursor-pointer box-border rounded-[5px]'
                                        : 'flex items-center gap-2 p-3 hover:bg-slate-200 hover:cursor-pointer box-border rounded-[5px]'}
                                >
                                    <FontAwesomeIcon icon={tab.icon} size="xl" />
                                    <div className='text-xl'>
                                        <span >{tab.content}</span>
                                    </div>
                                </div>
                            ))}

                        </div>

                        <div className={styles.content_history}
                        // 'w-auto h-[90%] mt-3 flex flex-col gap-2' 
                        >

                            {tabType === 'questions' && <>
                                {questions.length > 0 ?
                                    questions.map((item, index) => (
                                        <div key={index} className={index % 2 === 0 ? styles.content_history_gray
                                            : ''} >
                                            <p>{item.name}</p>
                                            <p>{item.time}</p>
                                        </div>
                                    ))
                                    : <div className={styles.content_history_mess}>
                                        <span>Bạn chưa làm bài tập nào</span>
                                    </div>
                                }</>
                            }

                            {tabType === 'tournaments' && <>
                                {tournaments.length > 0 ?
                                    tournaments.map((item, index) => (
                                        <div key={index} className={index % 2 === 0 ? styles.content_history_gray
                                            : ''} >
                                            <p>{item.name}</p>
                                            <p>{item.time}</p>
                                        </div>
                                    ))
                                    : <div className={styles.content_history_mess}>
                                        <span>Bạn chưa tham gia giải đấu nào</span>
                                    </div>
                                }
                            </>
                            }


                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}



export default UserOverView;