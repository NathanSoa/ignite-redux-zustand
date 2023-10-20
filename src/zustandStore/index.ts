import { create } from 'zustand'
import { api } from '../lib/axios'

type PlayFunction = ({ moduleIndex, lessonIndex }: { moduleIndex: number, lessonIndex: number }) => void
type VoidAsyncFunction = () => Promise<void>

interface Lesson {
    id: string
    title: string
    duration: string
}

interface Module {
    id: number
    title: string
    lessons: Lesson[]
}

interface Course {
    id: number
    modules: Module[]
}

interface PlayerState {
    course: Course | null
    currentModuleIndex: number
    currentLessonIndex: number
    isLoading: boolean

    play: PlayFunction
    next: VoidFunction
    load: VoidAsyncFunction
}

export const useStore = create<PlayerState>((set, get) => {
    return {
        course: null,
        currentLessonIndex: 0,
        currentModuleIndex: 0,
        isLoading: false,

        load: async () => {
            set({ isLoading: true })
            const response = await api.get('/courses/1')
            set({ course: response.data, isLoading: false })
        },

        play: ({ moduleIndex, lessonIndex }: { moduleIndex: number, lessonIndex: number }) => {
            set({
                currentLessonIndex: lessonIndex,
                currentModuleIndex: moduleIndex
            })
          },
    
        next: () => {
        const { currentModuleIndex, currentLessonIndex, course } = get()
        const nextLesson = course?.modules[currentModuleIndex].lessons[currentLessonIndex + 1]

        if(nextLesson) {
            set({currentLessonIndex: currentLessonIndex + 1})
        } else {
            const nextModuleIndex = currentModuleIndex + 1
            const nextModule = course?.modules[nextModuleIndex]
            if(nextModule) {
            set({
                currentModuleIndex: nextModuleIndex,
                currentLessonIndex: 0
            })
            }
        }
        }
    }
})

export const useCurrentLesson = () => {
    return useStore(store => {
      const { currentModuleIndex, currentLessonIndex } = store
      const currentLesson = store.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
      const currentModule = store.course?.modules[currentModuleIndex]
      return {currentLesson: currentLesson, currentModule: currentModule}
  })
}