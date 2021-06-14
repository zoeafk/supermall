import {request2} from './request'
export function getDetail(iid){
	return request2({
		url:'/detail',
		params:{
			iid
		}
	})
}

//对复杂数据进行了整合
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}