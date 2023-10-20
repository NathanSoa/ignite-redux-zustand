import { MessageCircle } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustandStore'
import { useEffect } from 'react'
import { Header } from './components/Header'
import { Video } from './components/Video'
import { Module } from './components/Module'

// REDUX NECESSARY IMPORTS
// import { useAppDispatch, useAppSelector } from '../stores'
// import { useCurrentLesson } from '../stores'
// import { loadCourse } from '../stores/slices/player'

export function Player() {
    // REDUX WAY OF DOING THINGS
    // const dispatch = useAppDispatch()

    // const modules = useAppSelector(store => store.player.course?.modules)
    // const { currentLesson } = useCurrentLesson()

    // useEffect(() => {
    //     document.title = `Player | ${currentLesson?.title ?? 'Carregando'}`
    // }, [currentLesson])

    // useEffect(() => {
    //     dispatch(loadCourse())
    // }, [dispatch])

    // ZUSTAND WAY OF DOING THINGS
    const { course, load } = useStore(store => ({
        course: store.course,
        load: store.load
    }))
    const { currentLesson } = useCurrentLesson()

    useEffect(() => {
        document.title = `Player | ${currentLesson?.title ?? 'Carregando'}`
    }, [currentLesson])

    useEffect(() => {
        load()
    }, [])

    return (
        <>
        <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
            <div className="flex w-[1100px] flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Header />
                    <button className='flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700'>
                        <MessageCircle className="w-4 h-4" />
                        Deixar Feedback
                    </button>
                </div>
                <main className='relative flex overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow pr-80'>
                    <div className='flex-1'>
                        <Video />
                    </div>
                    <aside className='w-80 border-l border-l-zinc-800 divide-y-2 divide-zinc-900 bg-zinc-900 overflow-y-scroll absolute top-0 bottom-0 right-0 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800'>
                        {course?.modules && course.modules.map((module, index) => (
                            <Module
                                title={module.title}
                                amountOfLessons={module.lessons.length}
                                moduleIndex={index}
                                key={module.id}
                            />
                        ))}
                    </aside>
                </main>
            </div>
        </div>
        </>
    )
}