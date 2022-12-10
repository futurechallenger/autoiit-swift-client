//
//  ServiceInfo.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import Foundation

struct ServiceInfo: Hashable, Codable, Identifiable {
  var id: Int
  var name: String
  
  init() {
    self.id = -1
    self.name = ""
  }
  
  init(id: Int, name: String) {
    self.id = id
    self.name = name
  }
  
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
      retrieveKey: "service",
      variables: ["serviceId": serviceId],
      operationName: nil) as? [String: Any]
    
    guard let serviceDict = ret else {
      return nil
    }
    
    let serviceInfo = ServiceInfo(id: serviceDict["id"] as! Int, name: serviceDict["name"] as! String)
    
    return serviceInfo
  }
  
  // TODO: implement this method
  static func loadList(serviceType: LoadServiceType) async -> [ServiceInfo]? {
    let res = await HTTPService.requestGQL(
      query:
      """
        query getServices($type: String!) {
          servicesByType(serviceType: $type, userId:1) {
            id
            name
          }
        }
      """,
      retrieveKey: "servicesByType",
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
          name: serv["name"] as! String
        )
      )
    }
    
    return serviceInfoList
  }
  
  enum LoadServiceType {
    case All, Favorite, Recommended
  }
}

