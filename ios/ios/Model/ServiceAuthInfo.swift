//
//  ServiceAuthInfo.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/10.
//

import Foundation

struct ServiceAuthInfo: Hashable, Codable, Identifiable {
  var id: ObjectIdentifier
  
  private var authorizationUrl: String
  private var providerName: String
  
  init () {
    self.authorizationUrl = ""
    self.providerName = ""
  }
  
  init (authorizationUrl: String, providerName: String) {
    self.authorizationUrl = authorizationUrl
    self.providerName = providerName
  }
    
  func doAuth() {
    
  }
}
