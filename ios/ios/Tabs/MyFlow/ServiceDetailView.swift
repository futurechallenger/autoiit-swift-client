//
//  ServiceDetailView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct ServiceDetailView: View {
  var service: ServiceInfo
  
    var body: some View {
      Text(self.service.name)
    }
}

struct ServiceDetailView_Previews: PreviewProvider {
    static var previews: some View {
        ServiceDetailView(service: ServiceInfo(id: 1, name: "Sample Service"))
    }
}
