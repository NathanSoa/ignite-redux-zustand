import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { player } from './slices/player'

export const store = configureStore({
    reducer: {
        player
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDisptach = useDispatch

export const useCurrentLesson = () => {
    return useAppSelector(store => {
      const { currentModuleIndex, currentLessonIndex } = store.player
      const currentLesson = store.player.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
      const currentModule = store.player.course?.modules[currentModuleIndex]
      return {currentLesson: currentLesson, currentModule: currentModule}
  })
}