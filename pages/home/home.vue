<template>
	<view class="content">
		<swiper indicator-bots autoplay="true" circular="true" duration="1000" interval="3000">
		    <swiper-item v-for="(item, index) in swiperList" :key="index">
				<!-- 路由传参 -->
		        <navigator :url="'../../subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" mode="" @click=""></image>
				</navigator>
		    </swiper-item>
		</swiper>
		<view class="nav">
			<view v-for="(item, index) in navList" :key="index" @click="navHandler(item.name)">
				<image :src="item.image_src" mode="" ></image>
			</view>
		</view>
		<view class="floor">
			<view class="banner" v-for="(item, index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" mode=""></image>
				<view class="floorContent">
					<navigator
						class="box"
						v-for="(jtem, index) in item.product_list"
						:key="index"
						:url="jtem.url">
						<image :src="jtem.image_src" mode=""></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],					// 轮播图数据
				navList: [],					// 分类导航数据
				floorList: [],					// 楼层区数据
			}
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList(){
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res);
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
				// uni.$showMsg('数据请求成功！')
			},
			async getNavList(){
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				// console.log(res);
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			async getFloorList(){
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				// console.log(res);
				if(res.meta.status !== 200) return uni.$showMsg()
				
				// 通过双重 forEach() 遍历，将 floor.product_list 中的 navigator_url 地址截取换'?'后的数据
				// 在重新拼接添加到一个新的属性
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
				console.log(this.floorList);
			},
			navHandler(name){
				if(name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	view.content {
		swiper {
			width: 100%;
			height: 350rpx;
			swiper-item {
				navigator {
					width: 100%;
					height: 100%;
					background-color: greenyellow;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		view.nav {
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 200rpx;
			view {
				flex: 1;
				padding: 20rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		view.floor {
			margin: 10rpx 0 0 0;
			width: 100%;
			view.banner {
				display: flex;
				flex-direction: column;
				padding: 15rpx;
				height: 500rpx;
				image {
					width: 100%;
					height: 55rpx;
				}
				view.floorContent {
					flex: 1;
					width: 100%;
					navigator.box {
						float: left;
						width: 33%;
						height: calc(50% - 15rpx / 2);
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
							box-shadow:  5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
						}
					}
					navigator.box:first-child {
						width: 30%;
						height: 100%;
					}
					navigator.box:nth-child(n+2) {
						margin: 0 0 0 15rpx;
					}
					navigator.box:nth-child(n+4) {
						margin: 15rpx 0 0 15rpx;
					}
				}
			}
		}
	}
</style>
