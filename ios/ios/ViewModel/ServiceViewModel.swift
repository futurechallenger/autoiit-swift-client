//
//  ServiceViewModel.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/7.
//

import Foundation

class ServiceViewModel: ObservableObject {
  @Published var serviceInfo: ServiceInfo? = nil
  
  func load(serviceId: Int) async -> ServiceInfo? {
    let serviceInfo = await HTTPService.request(of: ServiceInfo.self,
                                                method: "GET",
                                                headers: nil,
                                                body: ["query": "", "variables": "", "operationName": ""])
    if let ret = serviceInfo {
      self.serviceInfo = ret
    }
    
    return serviceInfo
  }
  
  // TODO: implement this method
  func loadList(serviceType: LoadSeviceType) async -> [ServiceInfo]? {
    
  }
  
  enum LoadSeviceType {
    case Favorite, All
  }
}


