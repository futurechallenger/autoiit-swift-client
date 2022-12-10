//
//  ProfileView.swift
//  ios
//
//  Created by Uncle Charlie on 2022/12/6.
//

import SwiftUI

struct ProfileView: View {
    var body: some View {
      List {
        
        HStack {
          Text("Row 1")
        }
        VStack {
          HStack {
            Button {
              print("Sign out button clicked")
            } label: {
              Text("Sign out").fontWeight(.heavy)
            }
          }
          Text("user code")
        }
      }
    }
}

struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}
