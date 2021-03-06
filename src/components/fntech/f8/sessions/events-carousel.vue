<template>
    <div class="container-fluid">
        <div class="row pt-7 pl-5">
            <div class="col-3 todays-sessions">
                Today´s Sessions
            </div>
            <div class="col-9 events-wrapper">
                <swiper ref="slider" :options="swiperOption">
                    <swiper-slide class="event" v-for="event in events" :key="event.id">
                        <div class="row">
                            <div class="col-2 text-right time">
                                {{ startTime(event) }}
                            </div>
                            <div class="col-10 text-left">
                                <div class="row">
                                    <div class="col-12 name">
                                        {{ event.title }}
                                    </div>
                                    <div class="col-12 room" v-if="room(event)">
                                        Location: {{ room(event) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>

    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        props: ['schedule', 'upcoming'],
        data() {
            return {
                sliding: null,
                eventsCache: null,
                swiperOption: {
                    direction: 'vertical',
                    allowTouchMove: false,
                    height: 1,
                    spaceBetween: 0,
                    slidesPerView: 'auto',
                    loop: false,
                    speed: 5000,
                    on: {
                        init: function () {
                            this.slideTo(1, 25000, true)
                        },
                        transitionEnd: this.swiperTransitionEnd
                    }
                }
            }
        },
        methods: {
            swiperRestart: function () {
                this.swiper.detachEvents()
                this.swiper.destroy()
                this.$refs.slider.mountInstance()
            },
            swiperTransitionEnd: function () {
                if (!this.swiper.isEnd) {
                    this.sliding = true
                    this.swiper.slideNext(this.swiper.params.speed)
                } else {
                    this.sliding = false

                    let vm = this;
                    vm.$nextTick(function () {
                        vm.swiperRestart()
                    });
                }
            }
        },
        computed: {
            events() {
                if (this.sliding == null) {
                    this.sliding = true
                    this.eventsCache = this.upcoming
                    
                }

                if (!this.sliding) {
                    this.eventsCache = this.upcoming
                }

                return this.eventsCache
            },
            swiper() {
                return this.$refs.slider.swiper
            },
            startTime() {
                return event => event && this.schedule.getDate(event.start_date).format('h:mm') || 'N/A'
            },
            room() {
                return event => event && event.location.name || null
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style>
    .swiper-wrapper {
        -webkit-transition-timing-function: linear!important;
        -o-transition-timing-function: linear!important;
        transition-timing-function: linear!important;
        transform: translate3d(0px, 858px, 0px);
    }
    .events-wrapper {
        overflow: hidden;
        height: 858px;
        margin-top: 15px;
    }
</style>
