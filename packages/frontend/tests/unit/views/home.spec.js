import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home1.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper).toBeTruthy()
  })
})
