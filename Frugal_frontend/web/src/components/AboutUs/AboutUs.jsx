import React from 'react'
const steps = [
    {
        title: "Initial Discussion",
        description: "We will have discussions on the requirements to ensure your MVP is ready for the initial launch.",
        icon: "M10 10l2 -2v8"
    },
    {
        title: "Deal Finalized",
        description: "Once we agree on what to build, we will start working on it right away.",
        icon: "M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3"
    },
    {
        title: "Product Delivery",
        description: "We will develop your product MVP in 15 days (more time required depending on the complexity of the project).",
        icon: "M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1"
    },
    {
        title: "Celebrate your Launch",
        description: "We love Celebrations. We will celebrate your launch on our social profiles.",
        icon: "M10 8v3a1 1 0 0 0 1 1h3"
    }
];
const teamMembers = [
    {
        name: "Aniket Kapse",
        role: "Web Developer",
        image: "src/assets/profilepic.jpg",
        socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
        ],
    },
    {
        name: "Aniket Kapse",
        role: "Web Developer", image: "src/assets/profilepic.jpg",
        socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
        ],
    },
    {
        name: "Aniket Kapse",
        role: "Web Developer", image: "src/assets/profilepic.jpg",
        socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
        ],
    },
    {
        name: "Aniket Kapse",
        role: "Web Developer", image: "src/assets/profilepic.jpg",
        socials: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "instagram", link: "#" },
        ],
    },
];

function AboutUs() {
    return (
        <div>
            <div className="bg-[#D9D9D9] p-4 min-h-screen">
                <div className="max-w-7xl mx-auto h-max px-6 md:px-12 xl:px-6">
                    <div className="md:w-2/3 lg:w-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-100">
                            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
                        </svg>
                        <h2 className="my-8 text-2xl font-bold text-black md:text-4xl">How we work?</h2>
                        <p className="text-gray-900">We follow our process to get you started as quickly as possible</p>
                    </div>
                    <div className="mt-16 grid divide-x divide-y divide-gray-600 overflow-hidden rounded-3xl border text-gray-600 border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative bg-gray-700 p-4 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-900">
                                <div className="relative space-y-8 py-12 p-8">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="white" style={{ color: 'white' }} height="50" width="50" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d={step.icon} />
                                    </svg>
                                    <div className="space-y-2">
                                        <h5 className="text-xl font-semibold text-white transition group-hover:text-secondary">{step.title}</h5>
                                        <p className="text-gray-300">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-20 ">
                <div className="text-center mb-16">
                    <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">THE TEAM</p>
                    <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Meet Our <span className="text-[#6b0a83]">Team</span>
                    </h3>
                </div>

                <div className="sm:grid  grid-cols-2 md:grid-cols-4 gap-10 mx-auto">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="text-center max-w-[20rem] bg-[#D9D9D9] p-4 hover:shadow-2xl hover:shadow-gray-900 shadow-lg rounded-md">
                            <a href="#">
                                <img
                                    className="mb-3 rounded-xl mx-auto h-32  w-32"
                                    src={member.image}
                                    alt={member.name}
                                />
                            </a>
                            <a href="#" className="hover:text-indigo-500 text-gray-900 font-semibold">
                                {member.name}
                            </a>
                            <p className="text-gray-500 uppercase text-sm">{member.role}</p>
                            <div className="my-4 flex justify-center items-center">
                                {member.socials.map((social, idx) => (
                                    <a key={idx} href={social.link} className="mr-3">
                                        <svg
                                            width="18px"
                                            height="18px"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M17 3.5a.5.5 0 0 0-.5-.5H14a4.77 4.77 0 0 0-5 4.5v2.7H6.5a.5.5 0 0 0-.5.5v2.6a.5.5 0 0 0 .5.5H9v6.7a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-6.7h2.62a.5.5 0 0 0 .49-.37l.72-2.6a.5.5 0 0 0-.48-.63H13V7.5a1 1 0 0 1 1-.9h2.5a.5.5 0 0 0 .5-.5z" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default AboutUs
