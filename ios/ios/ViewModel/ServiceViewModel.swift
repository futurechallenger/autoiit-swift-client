//
//  ServiceViewModel.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/7.
//

import Foundation

class ServiceViewModel: ObservableObject {
  @Published var serviceInfo: ServiceInfo? = nil
  @Published var serviceInfoList: [ServiceInfo]? = nil
  
  func load(serviceId: Int) async -> ServiceInfo? {
    let serviceInfo = await HTTPService.request(of: ServiceInfo.self,
                                                method: "GET",
                                                headers: nil,
                                                body: ["query": """
                                                "query getService($serviceId: Int!) {
                                                       service(id: $serviceId) {
                                                          id
                                                          name
                                                        }
                                                      }
                                                """,
                                                "variables": "{\"serviceId\": \(serviceId)}", "operationName": ""])
    
      if let ret = serviceInfo {
      self.serviceInfo = ret
    }
    
    return serviceInfo
  }
  
  // TODO: implement this method
  func loadList(serviceType: LoadSeviceType) async -> [ServiceInfo]? {
    
    let res = await HTTPService.request(of: [ServiceInfo.self],
                                                method: "GET",
                                                headers: nil,
                                                body: ["query": """
                                                        query getServices($type: String!) {
                                                          servicesByType(serviceType: $type, userId:1) {
                                                            id
                                                            name
                                                          }
                                                         
                                                        """,
                                                       "variables": "{\"type\": \"RECOMMENDED\"}", "operationName": ""])
    if let ret = res {
      self.serviceInfoList = ret
    }
    
    return serviceInfoList
  }
  
  enum LoadSeviceType {
    case Favorite, All
  }
}


