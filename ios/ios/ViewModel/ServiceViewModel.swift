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
    let ret = await HTTPService.requestGQL(
      query: """
            query getService($serviceId: Int!) {
              service(id: $serviceId) {
                id
                name
              }
            }
      """,
      retriveKey: "service",
      variables: ["serviceId": serviceId],
      operationName: nil) as? [String: Any]
    
    guard let serviceDict = ret else {
      return nil
    }
    
    serviceInfo = ServiceInfo(id: serviceDict["id"] as! Int, name: serviceDict["name"] as! String, deleted: serviceDict["deleted"] as! Int)
    
    return serviceInfo
  }
  
  // TODO: implement this method
  func loadList(serviceType: LoadSeviceType) async -> [ServiceInfo]? {
    
    let res = await HTTPService.requestGQL(
      query:
      """
        query getServices($type: String!) {
          servicesByType(serviceType: $type, userId:1) {
            id
            name
          }
      """,
      retriveKey: "servicesByType",
      variables: ["type": "RECOMMENDED"],
      operationName: nil) as? [[String: Any]]
    
    guard let serviceList = res else  {
      return nil
    }
    
    var serviceInfoList: [ServiceInfo] = []
    for serv in serviceList {
      serviceInfoList.append(
        ServiceInfo(
          id: serv["id"] as! Int,
          name: serv["name"] as! String,
          deleted: serv["deleted"] as! Int)
      )
    }
    
    self.serviceInfoList = serviceInfoList
    
    return serviceInfoList
  }
  
  enum LoadSeviceType {
    case Favorite, All
  }
}


