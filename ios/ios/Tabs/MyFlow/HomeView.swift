//
//  HomeView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/4.
//

import SwiftUI

struct HomeView: View {
  @State private var recommendedServices: [ServiceInfo] = []
  
  var body: some View {
    NavigationView {
      List (self.recommendedServices) { service in
        NavigationLink {
          ServiceDetailView(service: service)
        } label: {
          ServiceInfoRow(text: service.name)
        }
      }
      .navigationTitle("Flows")
    }
    .task {
      self.recommendedServices = await ServiceInfo.loadList(serviceType: .Recommended) ?? []
    }
  }
}

struct HomeView_Previews: PreviewProvider {
  static var previews: some View {
    HomeView()
  }
}
