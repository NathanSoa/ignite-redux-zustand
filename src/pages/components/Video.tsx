import ReactPlayer from 'react-player'
import { Loader } from 'lucide-react'
import { useCurrentLesson, useStore } from '../../zustandStore'

// REDUX NECESSARY IMPORTS
// import { next } from '../../stores/slices/player'
// import { useAppDispatch, useAppSelector, useCurrentLesson } from '../../stores'

export function Video() {
    // REDUX WAY OF DOING THINGS
    // const dispatch = useAppDispatch()

    // const { currentLesson } = useCurrentLesson()
    // const isCourseLoading = useAppSelector(store => store.player.isLoading)

    // function handleNext() {
    //     dispatch(next())
    // }

    // ZUSTAND WAY OF DOING THINGS
    const { next, isLoading } = useStore(store => ({
        next: store.next,
        isLoading: store.isLoading
    }))
    const { currentLesson } = useCurrentLesson()

    function handleNext() {
        next()
    }
    
    return (
        <div className='w-full bg-zinc-950 aspect-video'>
            { isLoading ? (
                <div className='flex items-center justify-center h-full'>
                    <Loader className='w-6 h-6 text-zinc-400 animate-spin' />
                </div>
                ) : (
                    <ReactPlayer 
                        width='100%'
                        height='100%'
                        url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
                        onEnded={handleNext}
                        controls
                        playing
                    />
                )
            }
        </div>
        )
}