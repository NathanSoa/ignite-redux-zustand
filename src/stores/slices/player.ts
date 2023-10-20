import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../lib/axios'

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
}

const initialState: PlayerState = {
  course: null, 
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true
}

export const loadCourse = createAsyncThunk(
  'player/load',
  async () => {
    const response = await api.get('/courses/1')
    return response.data
  }
)

const playerSlice = createSlice({
    name: 'player',
    initialState,

    reducers: {
      play: (state, action: PayloadAction<{moduleIndex: number, lessonIndex: number}>) => {
        state.currentModuleIndex = action.payload.moduleIndex
        state.currentLessonIndex = action.payload.lessonIndex
      },

      next: (state) => {
        const { currentModuleIndex, currentLessonIndex } = state
        const nextLesson = state.course?.modules[currentModuleIndex].lessons[currentLessonIndex + 1]

        if(nextLesson) {
          state.currentLessonIndex++
        } else {
          const nextModuleIndex = currentModuleIndex + 1
          const nextModule = state.course?.modules[nextModuleIndex]
          if(nextModule) {
            state.currentModuleIndex = nextModuleIndex
            state.currentLessonIndex = 0
          }
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(loadCourse.pending, (state) => {
        state.isLoading = true
      })

      builder.addCase(loadCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.course = action.payload
      })
    }
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions
export const initState = playerSlice.getInitialState()