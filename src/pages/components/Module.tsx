import { ChevronDown } from 'lucide-react'
import { Lesson } from './Lesson'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from '../../zustandStore'

// REDUX NECESSARY IMPORTS
// import { useAppDispatch, useAppSelector } from '../../stores'
// import { play } from '../../stores/slices/player'

interface ModuleProps {
    moduleIndex: number
    title: string
    amountOfLessons: number
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
    // REDUX WAY OF DOING THINGS
    // const dispatch = useAppDispatch()

    // const lessons = useAppSelector(store => store.player.course?.modules[moduleIndex].lessons)
    // const {currentLessonIndex, currentModuleIndex} = useAppSelector(store => store.player)

    // ZUSTAND WAY OF DOING THINGS
    const { currentLessonIndex, currentModuleIndex, play } = useStore(store => ({
        currentLessonIndex: store.currentLessonIndex,
        currentModuleIndex: store.currentModuleIndex,
        play: store.play
    }))
    const lessons = useStore(store => store.course?.modules[moduleIndex].lessons)

    return (
        <Collapsible.Root className='group' defaultOpen={moduleIndex === 0}>
            <Collapsible.Trigger className='flex w-full items-center gap-5 bg-zinc-800 p-4'>
                <div className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>
                    {moduleIndex + 1}
                </div>
                <div className='flex flex-col gap-1 text-left'>
                    <strong className='text-sm'>{title}</strong>
                    <span className='text-xs text-zinc-400'>{amountOfLessons} aulas</span>
                </div>
                <ChevronDown className='w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform' />
            </Collapsible.Trigger>
            <Collapsible.Content>
                <nav className='relative flex flex-col gap-4 p-6'>
                    {
                        lessons && lessons.map((lesson, index) => {
                            const isCurrent = currentLessonIndex === index && currentModuleIndex === moduleIndex
                            return (
                            <Lesson 
                                title={lesson.title}
                                duration={lesson.duration}
                                // REDUX WAY
                                // onPlay={() => dispatch(play({
                                //     moduleIndex,
                                //     lessonIndex: index
                                // }))}

                                // ZUSTAND WAY
                                onPlay={() => play({
                                    moduleIndex,
                                    lessonIndex: index
                                })}
                                isCurrent={isCurrent}
                                key={lesson.id}
                            />
                        )})
                    }
                </nav>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}