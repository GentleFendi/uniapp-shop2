
<template>
	<view class="content">
		<scroll-view scroll-y class="title" :style="{height: wh + 'px'}">
			<view
				class="left-scroll-view-item"
				v-for="(item, index) in cateList"
				:key="index">
				<view
					:class="[ 'left-scroll-view-item-text', index === active ? 'active' : '' ]"
					@click="activeChange(index)">
					{{ item.cat_name }}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y class="right-scroll-view-item" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
			<view class="right-scroll-view-floor" v-for="(item, index) in cateLevel2" :key="index">
				<view class="title">
					{{ item.cat_name }}
				</view>
				<view class="info">
					<view
						class="list"
						v-for="(list, index) in item.children"
						:key="index"
						@click="gotoGoodsList(list)">
						<image src="../../static/logo.png" mode=""></image>
						<view class="text">
							{{ list.cat_name }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,														// 当前设备高度
				cateList: [],												// 分类数据
				active: 0,													// 焦点
				cateLevel2: [],												// 二级分类
				scrollTop: 0
			}
		},
		onLoad(){
			const sysInfo = uni.getSystemInfoSync()							// 获取当前设备信息
			this.wh = sysInfo.windowHeight
			
			this.getCateList()
		},
		methods: {
			async getCateList(){
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				// console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children					// 二级分类
				// console.log("cateList", this.cateList);
			},
			activeChange(index){
				this.active = index
				
				this.cateLevel2 = this.cateList[index].children				// 重新刷新二级分类数据
				console.log(index, this.cateLevel2);
				
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(id){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + id.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
view.content {
	display: flex;
	width: 100%;
	height: 100vh;
	scroll-view.title {
		display: flex;
		flex-direction: column;
		max-width: 20%;
		background-color: ghostwhite;
		.left-scroll-view-item {
			
			.left-scroll-view-item-text {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 35rpx 0;
				font-size: 27rpx;
				letter-spacing: 3rpx;
				font-weight: 600;
				&.active {
					position: relative;
					background-color: #D2FADF;
					transition: all .3s ease 0s;
					&::before {
						content: '';
						position: absolute;
						left: 0;
						width: 5%;
						height: 90%;
						background-color: #00B26A;
						transition: all .3s ease 0s;
					}
				}
			}
		}
	}
	scroll-view.right-scroll-view-item {
		flex: 1;
		.right-scroll-view-floor {
			padding: 10rpx;
			width: 100%;
			.title {
				margin: 10rpx 0 20rpx 0;
				width: 100%;
				text-align: center;
			}
			.info {
				width: calc(100% - 10px);
				.list {
					margin: 0 5rpx;
					display: inline-block;
					width: calc(100% / 3 - 6px);
					image {
						margin: 0;
						width: 100%;
						height: 150rpx;
					}
					.text {
						margin: 0 0 5rpx 0;
						width: 100%;
						max-height: 60rpx;
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
}
</style>
